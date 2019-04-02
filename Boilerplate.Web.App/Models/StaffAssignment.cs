using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Boilerplate.Web.App.Models
{
    public partial class StaffAssignment
    {
        [Key, Column(Order = 1)]
        public int StaffId { get; set; }
        [Key, Column(Order = 2)]
        public int StoreId { get; set; }

        public Staff Staff { get; set; }
        public Store Store { get; set; }
    }
}
