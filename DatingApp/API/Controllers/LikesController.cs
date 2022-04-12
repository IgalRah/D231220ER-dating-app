using System.Net;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class LikesController : BaseApiController<LikesController>
    {
        private readonly IUserRepository _userRepository;
        private readonly ILikesRepository _likesRepository;

        public LikesController(
            IUserRepository userRepository,
            ILikesRepository likesRepository
        )
        {
            _likesRepository = likesRepository;
            _userRepository = userRepository;
        }

        [HttpPut("{username}")] // PUT api/likes/{username}
        public async Task<ActionResult> AddLike(string username)
        {
            var user = await GetUserAsync();

            var likedUser = await _userRepository.GetUserByUserNameAsync(username);

            if (likedUser == null) return NotFound();

            if (user.UserName == username) return BadRequest("you can't like yourself");

            var like = await _likesRepository.GetLikeAsync(user, likedUser);

            if (like == null)
            {
                await _likesRepository.AddLikeAsync(new UserLike
                {
                    SourceUserId = user.Id,
                    LikedUserId = likedUser.Id
                });
            }
            else
            {
                await _likesRepository.DeleteLikeAsync(like);
            }

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery] LikesParams likesParams)
        {
            likesParams.UserId = User.GetUserId();
            var users = await _likesRepository.GetUserLikes(likesParams);
            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(users);
        }
    }
}