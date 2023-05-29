using AutoMapper;
using Compass.Core.DTO_s;
using Compass.Core.Entities;
using Compass.Core.Validation.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Compass.Core.Services
{
    public class UserService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IMapper _mapper;
        private readonly JwtService _jwtService;
        private readonly EmailService _emailService;
        
        public UserService(IConfiguration configuration, UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IMapper mapper, JwtService jwtService, EmailService emailService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _jwtService = jwtService;
            _configuration = configuration;
            _emailService = emailService;
        }

        public async Task<ServiceResponse> RegisterAsync(RegisterUserDto model)
        {
            var mappedUser = _mapper.Map<RegisterUserDto, AppUser>(model);
            mappedUser.PhoneNumber = "+xx(xxx)xx-xx-xxx";
            var result = await _userManager.CreateAsync(mappedUser, model.Password);
            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(mappedUser, model.Role);
                await SendConfirmationEmailAsync(mappedUser);
                return new ServiceResponse
                {
                    Success = true,
                    Message = "User is successfully registered",
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = result.Errors.Select(e => e.Description).FirstOrDefault()
                };
            }
        }

        public async Task<ServiceResponse> LoginAsync(LoginUserDto model)
        {
            AppUser user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Login or password is incorrect"
                };
            }

            var signInResult = await _signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, lockoutOnFailure: true);
            if (signInResult.Succeeded)
            {
                var tokens = await _jwtService.GenerateJwtTokenAsync(user);
                return new ServiceResponse
                {
                    AccessToken = tokens.token,
                    RefreshToken = tokens.refreshToken.Token,
                    Success = true,
                    Message = "User is logged in successfully"
                };
            }

            if (signInResult.IsNotAllowed)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Confirm your email please"
                };
            }

            if (signInResult.IsLockedOut)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "Your account is locked. Connect with administrator"
                };
            }

            return new ServiceResponse
            {
                Success = false,
                Message = "Login or password is incorrect"
            };
        }

        public async Task<ServiceResponse> LogoutAsync(string userId)
        {
            // delete tokens from database
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is not found"
                };
            }

            IEnumerable<RefreshToken> tokens = await _jwtService.GetAll();
            foreach (RefreshToken token in tokens) 
            {
                await _jwtService.Delete(token);
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "User is logged out successfully"
            };
        }

        public async Task<ServiceResponse> GetAllAsync()
        {
            List<AppUser> users = _userManager.Users.ToList();
            List<AllUsersDto> mappedUsers = new List<AllUsersDto>();
            foreach (var user in users)
            {
                AllUsersDto mappedUser = _mapper.Map<AppUser, AllUsersDto>(user);
                if (user.LockoutEnd == null || user.LockoutEnd < DateTime.Now)
                {
                    mappedUser.IsLocked = false;
                }
                else
                {
                    mappedUser.IsLocked = true;
                }
                mappedUser.Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
                mappedUsers.Add(mappedUser);
            }

            return new ServiceResponse
            {
                Success = true,
                Message = "Users are successfully loaded",
                Payload = mappedUsers,
            };
        }

        public async Task<ServiceResponse> RefreshTokenAsync(TokenRequestDto model)
        {
           return await _jwtService.VerifyTokenAsync(model);
        }

        public async Task<ServiceResponse> ConfirmEmailAsync(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is not found"
                };
            }

            var decodedToken = WebEncoders.Base64UrlDecode(token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ConfirmEmailAsync(user, normalToken);

            if (result.Succeeded)
                return new ServiceResponse
                {
                    Message = "Email is confirmed successfully",
                    Success = true,
                };

            return new ServiceResponse
            {
                Success = false,
                Message = "Email is not confirmed",
                Errors = result.Errors.Select(e => e.Description)
            };
        }

        public async Task SendConfirmationEmailAsync(AppUser newUser)
        {
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

            var encodedEmailToken = Encoding.UTF8.GetBytes(token);
            var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

            string url = $"{_configuration["HostSettings:URL"]}/api/User/ConfirmEmail?userid={newUser.Id}&token={validEmailToken}";

            string emailBody = $"<h1>Confirm your email</h1> <a href='{url}'>Confirm now</a>";
            await _emailService.SendEmailAsync(newUser.Email, "Email confirmation.", emailBody);
        }

        public async Task<ServiceResponse> EditAsync(EditUserDto model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is not found"
                };
            }

            user.Name = model.Name;
            user.Surname = model.Surname;
            user.PhoneNumber = model.PhoneNumber;
            if (user.Email != model.Email)
            {
                user.Email = model.Email;
                user.UserName = model.Email;
                user.EmailConfirmed = false;
                await SendConfirmationEmailAsync(user);
            }

            // update role
            List<string> roles = (List<string>)await _userManager.GetRolesAsync(user);
            if(!await _userManager.IsInRoleAsync(user, model.Role))
            {
                var removeFromRoleResult = await _userManager.RemoveFromRoleAsync(user, roles[0]);
                if (removeFromRoleResult.Succeeded) 
                {
                    await _userManager.AddToRoleAsync(user, model.Role);
                }
            }

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return new ServiceResponse
                {
                    Success = true,
                    Message = "User is successfully edited"
                };
            }

            List<IdentityError> errorList = result.Errors.ToList();
            string errors = "";

            foreach (var error in errorList)
            {
                errors = errors + error.Description.ToString();
            }

            return new ServiceResponse
            {
                Success = false,
                Message = errors
            };
        }

        public async Task<ServiceResponse> ChangePasswordAsync(ChangePasswordDto model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if(user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is not found"
                };
            }
            var changePasswordResult = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.Password);
            if (changePasswordResult.Succeeded)
            {
                return new ServiceResponse
                {
                    Success = true,
                    Message = "Password is successfully changed"
                };
            }

            List<IdentityError> errorList = changePasswordResult.Errors.ToList();
            string errors = "";

            foreach (var error in errorList)
            {
                errors = errors + error.Description.ToString();
            }

            return new ServiceResponse
            {
                Success = false,
                Message = errors
            };
        }

        public async Task<ServiceResponse> SelectAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if(user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is not found"
                };
            }
            return new ServiceResponse
            {
                Success = true,
                Message = "User is found",
                Payload = user
            };
        }

        public async Task<ServiceResponse> UpdateProfileAsync(UpdateProfileDto model)
        {
            var user = await _userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is not found"
                };
            }

            user.Name = model.Name;
            user.Surname = model.Surname;
            user.PhoneNumber = model.PhoneNumber;
            if (user.Email != model.Email)
            {
                user.Email = model.Email;
                user.UserName = model.Email;
                user.EmailConfirmed = false;
                await SendConfirmationEmailAsync(user);
            }

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return new ServiceResponse
                {
                    Success = true,
                    Message = "User is successfully edited"
                };
            }

            List<IdentityError> errorList = result.Errors.ToList();
            string errors = "";

            foreach (var error in errorList)
            {
                errors = errors + error.Description.ToString();
            }

            return new ServiceResponse
            {
                Success = false,
                Message = errors
            };
        }

        public async Task<ServiceResponse> DeleteAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is not found",
                };
            }
            var deleteResult = await _userManager.DeleteAsync(user);
            if (deleteResult.Succeeded)
            {
                return new ServiceResponse
                {
                    Success = true,
                    Message = "User is successfully deleted",
                };
            }
            List<IdentityError> errorList = deleteResult.Errors.ToList();
            string errors = "";
            foreach (var error in errorList)
            {
                errors += error.Description.ToString();
            }
            return new ServiceResponse
            {
                Success = false,
                Message = errors,
            };
        }

        public async Task<ServiceResponse> BlockAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is not found",
                };
            }

            if (!await _userManager.IsLockedOutAsync(user))
            {
                user.LockoutEnabled = true;
                user.LockoutEnd = DateTime.UtcNow.AddDays(365);
                await _userManager.UpdateAsync(user);
                return new ServiceResponse
                {
                    Success = true,
                    Message = "User is successfully blocked",
                };
            }
            else
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is already blocked",
                };
            }            
        }

        public async Task<ServiceResponse> UnblockAsync(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is not found",
                };
            }

            if (await _userManager.IsLockedOutAsync(user))
            {
                user.LockoutEnabled = false;
                user.LockoutEnd = null;
                await _userManager.UpdateAsync(user);
                return new ServiceResponse
                {
                    Success = true,
                    Message = "User is successfully unblocked",
                };
            } 
            else
            {
                return new ServiceResponse
                {
                    Success = false,
                    Message = "User is alredy unblocked",
                };
            }

        }
    }
}