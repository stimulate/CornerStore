using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Boilerplate.Web.App.Models;

namespace Boilerplate.Web.App.Controllers
{
    public class CustomersController : Controller
    {
        private readonly SDJR1Context _context;

        public CustomersController(SDJR1Context context)
        {
            _context = context;
        }

        // GET: Customers  
        
        public async Task<IActionResult> Index()
        {
            //return View(await _context.Customer.ToListAsync());
            return View();
        }

        [Route("customer")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> Overview()
        {
            var _cus = await _context.Customer.ToListAsync();
            return Json(_cus);
        }

        [Route("customer/new")]
        [HttpPost]
        public async Task<ActionResult> Add(Customer cus)
        {                        
            _context.Add(cus);
            await _context.SaveChangesAsync();
            return RedirectToRoute("customer");
        }

        [Route("customer/delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Remove(int id)
        {
            var cus = await _context.Customer.FindAsync(id);
            _context.Remove(cus);
            await _context.SaveChangesAsync();
            return RedirectToRoute("customer");
        }

        
        [HttpPost]
        [Route("customer/adjust/{id}")]        
        public async Task<IActionResult> adjust(Customer cus)
        {
            var customerFind = await _context.Customer
                .FirstOrDefaultAsync(m => m.Id == cus.Id);

            customerFind.Address = cus.Address;
            customerFind.Phone = cus.Phone;
            customerFind.Name = cus.Name;
            _context.Entry(customerFind).State = EntityState.Modified;
            //_context.Update(customer);
            await _context.SaveChangesAsync();

            //try
            //{
            //    _context.Update(customer);
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!CustomerExists(customer.Id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}
            return RedirectToRoute("customer");           
        }

        // GET: Customers/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customer = await _context.Customer
                .FirstOrDefaultAsync(m => m.Id == id);
            if (customer == null)
            {
                return NotFound();
            }

            return View(customer);
        }

        // GET: Customers/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Customers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name,Address,Phone")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                _context.Add(customer);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(customer);
        }
        [Route("customer/edit/{id}")]
        // GET: Customers/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customer = await _context.Customer.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return View(customer);
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Address,Phone")] Customer customer)
        {
            if (id != customer.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(customer);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!CustomerExists(customer.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(customer);
        }

        // GET: Customers/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customer = await _context.Customer
                .FirstOrDefaultAsync(m => m.Id == id);
            if (customer == null)
            {
                return NotFound();
            }

            return View(customer);
        }

        // POST: Customers/Delete/5
        
        [HttpPost]        
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var customer = await _context.Customer.FindAsync(id);
            _context.Customer.Remove(customer);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool CustomerExists(int id)
        {
            return _context.Customer.Any(e => e.Id == id);
        }
    }
}
