using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using CL2.Models;

namespace CL2.Controllers
{
    [Route("[controller]")]
    public class LecturesController : Controller
    {
        private readonly CourseContext _context;

        public LecturesController(CourseContext context)
        {
            _context = context;
        }
        [HttpGet("GetAll")]
        public Lectures[] GetAll()
        {
            return _context.Lectures.ToArray();

        }
        [HttpGet("GetActor/{id}")]
        public IActionResult GetLectures(int id)
        {
            var lectures = from l in _context.Lectures
                         where l.Id == id
                         select l;
            var lecture = lectures.FirstOrDefault();
            if (lecture == null) return NotFound();
            return Ok(lecture);
        }
    }
}
