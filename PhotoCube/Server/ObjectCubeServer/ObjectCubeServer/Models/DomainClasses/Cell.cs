﻿using System.Collections.Generic;
using System.Linq;
using ObjectCubeServer.Models.PublicClasses;

namespace ObjectCubeServer.Models.DomainClasses
{
    /// <summary>
    /// Represents a cell in the cube.
    /// Has x,y,z coordinates and the CubeObjects associated with the Cell 
    /// (based on which tags are on position x,y,z on X,Y,Z-axis.)
    /// </summary>
    public class Cell
    {
        public int x { get; set; }
        public int y { get; set; }
        public int z { get; set; }
        public int count { get; set; }
        public List<CubeObject> CubeObjects { get; set; }

        // To change the domain model cell to public model cell
        public PublicCell GetPublicCell()
        {
            List<PublicCubeObject> cubeObjects = CubeObjects.Select(co => co.GetPublicCubeObject()).ToList();
            return new PublicCell(this.x, this.y, this.z, this.count, cubeObjects);
        }

        public PublicCell GetPublicCell(int skip, int pageSize)
        {
            List<PublicCubeObject> cubeObjects = CubeObjects.Select(co => co.GetPublicCubeObject()).Skip(skip).Take(pageSize).ToList();
            return new PublicCell(this.x, this.y, this.z, this.count, cubeObjects);
        }
    }
}
