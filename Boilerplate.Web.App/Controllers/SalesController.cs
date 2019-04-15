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
    public class SalesController : Controller
    {
        private readonly SDJR1Context _context;
        private Dictionary<int, String> stafflist = new Dictionary<int, String>();
        private Dictionary<int, String> cuslist = new Dictionary<int, String>();
        private Dictionary<int, String> prolist = new Dictionary<int, String>();
        private Dictionary<int, String> storelist = new Dictionary<int, String>();
        public SalesController(SDJR1Context context)
        {
            _context = context;
        }

        // GET: Sales
        [HttpGet]
        [Route("sales")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> Index()
        {
            var sDJR1Context = _context.TransactionHead.Include(t => t.Customer).Include(t => t.Product).Include(t => t.Staff).Include(t => t.Store);
            var sales = sDJR1Context.Select(x => new
            {
                ID = x.Id,
                Product = x.Product.Name,
                Date = x.Date,
                Customer = x.Customer.Name,
                Store = x.Store.Name,
                Staff = x.Staff.Name
            });
            return Json(await sales.ToListAsync());
        }

        // GET: Related data
        [HttpGet]
        [Route("sales/data")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> Data()
        {
            var staff = _context.Staff.Select(s => new { id = s.Id, name = s.Name }).ToList();
            foreach(var s in staff)
            {
                stafflist[s.id] = s.name;
            }
            var store = _context.Store.Select(s => new { id = s.Id, name = s.Name }).ToList();
            foreach (var s in store)
            {
                storelist[s.id] = s.name;
            }
            var pro = _context.Product.Select(s => new { id = s.Id, name = s.Name }).ToList();
            foreach (var s in pro)
            {
                prolist[s.id] = s.name;
            }
            var cus = _context.Customer.Select(s => new { id = s.Id, name = s.Name }).ToList();
            foreach (var s in cus)
            {
                cuslist[s.id] = s.name;
            }
            
            Dictionary<int, String>[] list = { stafflist, storelist, prolist, cuslist };

            return Json(list);
        }

        [Route("sales/new")]
        [HttpPost]
        public async Task<ActionResult> Add(TransactionHead cus)
        {
            _context.Add(cus);
            await _context.SaveChangesAsync();
            return RedirectToRoute("sales");
        }

        [Route("sales/delete/{id}")]
        [HttpDelete]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<ActionResult> Remove(int id)
        {
            var cus = await _context.TransactionHead.FindAsync(id);
            _context.Remove(cus);
            await _context.SaveChangesAsync();
            return RedirectToRoute("sales");
        }

        [HttpPost]
        [Route("sales/adjust/{id}")]
        [ResponseCache(Location = ResponseCacheLocation.None, NoStore = true)]
        public async Task<IActionResult> adjust(TransactionHead cus)
        {
            var salesFind = await _context.TransactionHead
                .FirstOrDefaultAsync(m => m.Id == cus.Id);

            salesFind.StaffId = cus.StaffId;
            salesFind.StoreId = cus.StoreId;
            salesFind.Date = cus.Date;
            salesFind.CustomerId = cus.CustomerId;
            salesFind.ProductId = cus.ProductId;
            _context.Entry(salesFind).State = EntityState.Modified;
            //_context.Update(sales);
            await _context.SaveChangesAsync();

            return RedirectToRoute("sales");
        }

        // GET: Sales/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var transactionHead = await _context.TransactionHead
                .Include(t => t.Customer)
                .Include(t => t.Product)
                .Include(t => t.Staff)
                .Include(t => t.Store)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (transactionHead == null)
            {
                return NotFound();
            }

            return View(transactionHead);
        }

        // GET: Sales/Create
        public IActionResult Create()
        {
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Address");
            ViewData["ProductId"] = new SelectList(_context.Product, "Id", "Name");
            ViewData["StaffId"] = new SelectList(_context.Staff, "Id", "Location");
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Address");
            return View();
        }

        // POST: Sales/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,CustomerId,StaffId,StoreId,ProductId,Date")] TransactionHead transactionHead)
        {
            if (ModelState.IsValid)
            {
                _context.Add(transactionHead);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Address", transactionHead.CustomerId);
            ViewData["ProductId"] = new SelectList(_context.Product, "Id", "Name", transactionHead.ProductId);
            ViewData["StaffId"] = new SelectList(_context.Staff, "Id", "Location", transactionHead.StaffId);
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Address", transactionHead.StoreId);
            return View(transactionHead);
        }

        // GET: Sales/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var transactionHead = await _context.TransactionHead.FindAsync(id);
            if (transactionHead == null)
            {
                return NotFound();
            }
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Address", transactionHead.CustomerId);
            ViewData["ProductId"] = new SelectList(_context.Product, "Id", "Name", transactionHead.ProductId);
            ViewData["StaffId"] = new SelectList(_context.Staff, "Id", "Location", transactionHead.StaffId);
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Address", transactionHead.StoreId);
            return View(transactionHead);
        }

        // POST: Sales/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CustomerId,StaffId,StoreId,ProductId,Date")] TransactionHead transactionHead)
        {
            if (id != transactionHead.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(transactionHead);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!TransactionHeadExists(transactionHead.Id))
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
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Address", transactionHead.CustomerId);
            ViewData["ProductId"] = new SelectList(_context.Product, "Id", "Name", transactionHead.ProductId);
            ViewData["StaffId"] = new SelectList(_context.Staff, "Id", "Location", transactionHead.StaffId);
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Address", transactionHead.StoreId);
            return View(transactionHead);
        }

        // GET: Sales/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var transactionHead = await _context.TransactionHead
                .Include(t => t.Customer)
                .Include(t => t.Product)
                .Include(t => t.Staff)
                .Include(t => t.Store)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (transactionHead == null)
            {
                return NotFound();
            }

            return View(transactionHead);
        }

        // POST: Sales/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var transactionHead = await _context.TransactionHead.FindAsync(id);
            _context.TransactionHead.Remove(transactionHead);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool TransactionHeadExists(int id)
        {
            return _context.TransactionHead.Any(e => e.Id == id);
        }
    }
}
