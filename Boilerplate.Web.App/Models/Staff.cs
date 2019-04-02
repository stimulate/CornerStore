using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Boilerplate.Web.App.Models
{
    public partial class Staff
    {
        public Staff()
        {
            StaffAssignment = new HashSet<StaffAssignment>();
            TransactionHead = new HashSet<TransactionHead>();
        }

        public int Id { get; set; }
        [Display(Name = "Staff Name")]
        [Required(ErrorMessage = "Please enter a staff name")]
        public string Name { get; set; }
        [Required]
        public string Location { get; set; }
        public int RoleId { get; set; }

        public Role Role { get; set; }
        public ICollection<StaffAssignment> StaffAssignment { get; set; }
        public ICollection<TransactionHead> TransactionHead { get; set; }
    }
}
