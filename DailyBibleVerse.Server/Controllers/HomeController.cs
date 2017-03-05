using DailyBibleVerse.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DailyBibleVerse.Server.Controllers
{

    public class HomeController : Controller
    {
        
        [Route("~/"), Route("~/chrome")]
        public ActionResult Chrome()
        {
            var model = VersesOfTheDay.NIV.VotdResponse;
            return this.View(model);
        }
        
        [Route("~/chrome/vi")]
        public ActionResult ChromeVietnamese()
        {
            var model = VersesOfTheDay.VIET1934.VotdResponse;
            return this.View(model);
        }

    }
}
