using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CL2.Models;


namespace CL2.Controllers
{
    [Route("[controller]")]
    public class CoursesController : Controller
    {
        private readonly CourseContext _context;
        public CoursesController(CourseContext context)
        {
            _context = context;
        }
        [HttpGet("GetAll")]
        public Course[] GetAll()
        {
            var courses = from c in _context.Courses
                          let lectures = _context.Lectures.Where(l => l.CourseId == c.Id)
                          select new Course() { Id = c.Id, Lectures = lectures.ToList(), courseCode = c.CourseCode };
            return courses.ToArray();
        }
        [HttpGet("GetCourse/{id}")]
        public IActionResult Get(int id)
        {
            var courses = from c in _context.Courses
                          where c.Id == id
                          let lectures = _context.Lectures.Where(l => l.CourseId == c.Id)
                          select new Course() { Id = c.Id, Lectures = lectures.ToList(), courseCode = c.CourseCode };
            var course = courses.FirstOrDefault();
            if (course == null) return NotFound();
            return Ok(course);
        }
    }
}