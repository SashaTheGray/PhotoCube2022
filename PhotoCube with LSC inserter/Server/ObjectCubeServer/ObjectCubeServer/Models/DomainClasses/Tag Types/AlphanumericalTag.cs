﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace ObjectCubeServer.Models.DomainClasses.TagTypes
{
    [Table("alphanumerical_tags")]
    public class AlphanumericalTag : Tag
    {   
        [Column("name")]
        public string Name { get; set; }

        [Column("tagset_id")]
        public int TagsetId { get; set; }
        public Tagset Tagset { get; set; }
    }
}
