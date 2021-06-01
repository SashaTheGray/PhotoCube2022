﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ObjectCubeServer.Models.DomainClasses
{
    /// <summary>
    /// Used in CellController to receive a JSON object repressenting an axis:
    /// Eg: {"AxisType":"Hierarchy","Id":1}
    /// </summary>
    public class ParsedAxis
    {
        public string AxisType { get; set; }
        // Either Tagset or Node id
        public int Id { get; set; }
    }
}