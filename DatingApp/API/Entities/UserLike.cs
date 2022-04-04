namespace API.Entities
{
    public class UserLike
    {
        public AppUser SourceUser { get; set; } // The user thats liking
        public int SourceUserId { get; set; }

        public AppUser LikedUser { get; set; } // The user thats is being liked
        public int LikedUserId { get; set; }

    }
}