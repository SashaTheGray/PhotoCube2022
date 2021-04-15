﻿using System.Collections.Generic;
using System.Linq;
using ObjectCubeServer.Models.PublicClasses;

namespace ObjectCubeServer.Models.DomainClasses
{
    /// <summary>
    /// Represents a cell in the cube.
    /// Has x,y,z coordinates and the CubeObjects associated with the Cell 
    /// (based on which tags are on position x,y,z on X,Y,Z-axis.
    /// </summary>
    public class Cell
    {
        public int x { get; set; }
        public int y { get; set; }
        public int z { get; set; }
        public List<CubeObject> CubeObjects { get; set; }

        // To change the domain model cell to public model simpleFileURICell
        public SimpleFileURICell ToSimpleFileURICell()
        {
            List<CubeObjectFileURI> cubeObjectFileURIs = CubeObjects.Select(co => co.ToCubeObjectFileUri()).ToList();
            return new SimpleFileURICell(this.x, this.y, this.z, cubeObjectFileURIs);
        }
    }
}
