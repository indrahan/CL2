using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace CL2.Models
{
    public class CourseContext : DbContext
    {
        public DbSet<Course> Courses { get; set; }
        public DbSet<Lecture> Lectures { get; set; }

        public CourseContext(DbContextOptions<CourseContext> options): base(options)
        {
        }

        public class Course
        {
            public int Id { get; set; }
            public string CourseCode { get; set; }
            public List<Lecture> Lectures { get; set; }
        }

        public class Lecture
        {
            public int Id { get; set; }
            public string LectureCode { get; set; }
            public string Teacher { get; set; }
            public int CourseId { get; set; }
            public Course Course { get; set; }

        }
    }
}