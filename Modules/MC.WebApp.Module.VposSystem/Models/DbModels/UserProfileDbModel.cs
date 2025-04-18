using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MC.WebApp.Module.VposSystem
{
    [Table("UserProfiles", Schema = "System")]
    public class UserProfileDbModel
    {
        [Key]
        public int UserProfileId { get; set; }
        [Required(ErrorMessage = "str_required")]
        public int UserId { get; set; }
        public string IdentityNumber { get; set; }
        public string Username { get; set; }
        public string UserSurname { get; set; }
        public byte? Gender { get; set; }
        public DateTime? BirthDate{ get; set; }
        public string Gsm { get; set; }
        public int? Nationality { get; set; }
        public int? BirthPlaceCity { get; set; }
        public int? BirthPlaceTown { get; set; }
        public string Address { get; set; }
    }
}