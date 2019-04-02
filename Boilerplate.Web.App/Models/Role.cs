using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public partial class Role
    {
        public Role()
        {
            Staff = new HashSet<Staff>();
        }

        public int Id { get; set; }
        [Required]
        public string RoleName { get; set; }

        public ICollection<Staff> Staff { get; set; }
    }
}
