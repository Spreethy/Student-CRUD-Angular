using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using StudentApi.Models;

namespace StudentApi.Controllers
{
    [RoutePrefix("api/students")]
    public class StudentController : ApiController
    {
        [HttpGet, Route("")]
        public IHttpActionResult GetAllStudents()
        {
            return Ok(JsonFileHelper.GetStudents());
        }

        [HttpGet, Route("{id}")]
        public IHttpActionResult GetStudent(string id)
        {
            var students = JsonFileHelper.GetStudents();
            var student = students.FirstOrDefault(s => s.Id == id);
            return student == null ? (IHttpActionResult)NotFound() : Ok(student);
        }

        [HttpPost, Route("")]
        public IHttpActionResult AddStudent([FromBody] Student student)
        {
            if (student == null || string.IsNullOrWhiteSpace(student.Name))
                return BadRequest("Invalid student data.");

            var students = JsonFileHelper.GetStudents();
            student.Id = Guid.NewGuid().ToString();
            students.Add(student);
            JsonFileHelper.SaveStudents(students);
            return Ok(student);
        }

        [HttpPut, Route("{id}")]
        public IHttpActionResult UpdateStudent(string id, [FromBody] Student updatedStudent)
        {
            if (updatedStudent == null || string.IsNullOrWhiteSpace(updatedStudent.Name))
                return BadRequest("Invalid student data.");

            var students = JsonFileHelper.GetStudents();
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null) return NotFound();

            student.Name = updatedStudent.Name;
            student.Age = updatedStudent.Age;
            student.Course = updatedStudent.Course;
            JsonFileHelper.SaveStudents(students);
            return Ok(student);
        }

        [HttpDelete, Route("{id}")]
        public IHttpActionResult DeleteStudent(string id)
        {
            var students = JsonFileHelper.GetStudents();
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null) return NotFound();

            students.Remove(student);
            JsonFileHelper.SaveStudents(students);
            return Ok();
        }
    }
}
