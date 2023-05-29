using Compass.Core.DTO_s;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Compass.Core.Validation.Category
{
    public class AddCategoryValidation : AbstractValidator<AddCategoryDto>
    {
        public AddCategoryValidation() 
        {
            RuleFor(x => x.Name).NotEmpty();
        }
    }
}
