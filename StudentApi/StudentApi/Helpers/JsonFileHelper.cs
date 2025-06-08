using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using System.Web.Hosting;
using StudentApi.Models;

public static class JsonFileHelper
{
    private static readonly string filePath = HostingEnvironment.MapPath("~/App_Data/students.json");

    public static List<Student> GetStudents()
    {
        if (!File.Exists(filePath))
        {
            SaveStudents(new List<Student>());
        }

        var jsonData = File.ReadAllText(filePath);
        return JsonConvert.DeserializeObject<List<Student>>(jsonData) ?? new List<Student>();
    }

    public static void SaveStudents(List<Student> students)
    {
        var jsonData = JsonConvert.SerializeObject(students, Formatting.Indented);
        File.WriteAllText(filePath, jsonData);
    }
}