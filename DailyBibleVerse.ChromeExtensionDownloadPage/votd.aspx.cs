using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class votd : System.Web.UI.Page
{

    private static string VotdResponse = null;
    private static DateTime LastTimeCheckedVotd;

    protected void Page_Load(object sender, EventArgs e)
    {
        if (VotdResponse == null || (DateTime.UtcNow - LastTimeCheckedVotd).Minutes > 5)
        {
            using (var webClient = new WebClient())
            {
                VotdResponse = webClient.DownloadString("https://www.biblegateway.com/votd/get/?format=json&version=NIV");
            }
            
            LastTimeCheckedVotd = DateTime.UtcNow;
        }
        
        Response.Clear();
        Response.ContentType = "application/json; charset=utf-8";
        Response.Write(VotdResponse);
        Response.End();
    }
    
}