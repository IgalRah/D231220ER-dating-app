using System.Security.Claims;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseApiController<T> : ControllerBase where T : BaseApiController<T>
    {
        private IUserRepository _userRepository;

        public IUserRepository UserRepository
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = HttpContext.RequestServices.GetService<IUserRepository>();
                }

                return _userRepository;
            }
        }

        public BaseApiController()
        {

        }

        protected async Task<AppUser> GetUserAsync()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            return await UserRepository.GetUserByIdAsync(userId);
        }
    }
}