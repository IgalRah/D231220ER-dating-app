namespace API.Errors
{
    public class ApiException
    {
        public int StatusCode { get; }
        public string Massage { get; }
        public string Details { get; }

        public ApiException(int statusCode, string massage = null, string details = null)
        {
            StatusCode = statusCode;
            Massage = massage;
            Details = details;
        }

    }
}