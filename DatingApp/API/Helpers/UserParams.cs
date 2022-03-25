using System;

namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber{get; set;}

        private int _pageSize;
        public int PageSize
        {
            get => _pageSize; //Setter
            set => _pageSize = Math.Min(MaxPageSize, value); //Getter
        }
    }
}