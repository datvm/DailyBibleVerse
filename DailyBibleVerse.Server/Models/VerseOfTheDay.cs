using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;

namespace DailyBibleVerse.Server.Models
{

    public static class VersesOfTheDay
    {

        public static readonly VerseOfTheDay NIV = new VerseOfTheDay(@"https://www.biblegateway.com/votd/get/?format=json&version=NIV");
        public static readonly VerseOfTheDay VIET1934 = new VerseOfTheDay(@"https://www.biblegateway.com/votd/get/?format=json&version=VIET");

    }

    public class VerseOfTheDay
    {

        public DateTime LastTimeCheckedVotd { get; private set; }

        private BibleGatewayVotd votdResponseField;
        public BibleGatewayVotd VotdResponse
        {
            get
            {
                this.RefreshIfNeeded();
                return this.votdResponseField;
            }
        }

        private object refreshLock = new object();

        private string FetchingUrl { get; }

        public VerseOfTheDay(string fetchUrl)
        {
            this.FetchingUrl = fetchUrl;
        }

        public void RefreshIfNeeded()
        {
            lock (this.refreshLock)
            {
                if (this.votdResponseField == null || (DateTime.UtcNow - this.LastTimeCheckedVotd).Minutes > 30)
                {
                    using (var webClient = new WebClient())
                    {
                        var rawResponse = webClient.DownloadString(this.FetchingUrl);
                        var response = JsonConvert.DeserializeObject<BibleGatewayVotdResponse>(rawResponse);

                        // Unescape the perma-link
                        response.votd.permalink = HttpUtility.HtmlDecode(response.votd.permalink);

                        this.votdResponseField = response.votd;
                    }

                    this.LastTimeCheckedVotd = DateTime.UtcNow;
                }
            }
        }

    }

    public class BibleGatewayVotdResponse
    {
        public BibleGatewayVotd votd { get; set; }
    }

    public class BibleGatewayVotd
    {
        public string audiolink { get; set; }
        public string content { get; set; }
        public string copyright { get; set; }
        public string copyrightlink { get; set; }
        public string day { get; set; }
        public string display_ref { get; set; }
        public string month { get; set; }
        public string permalink { get; set; }
        public string reference { get; set; }
        public string text { get; set; }
        public string version { get; set; }
        public string version_id { get; set; }
        public string year { get; set; }
    }

}