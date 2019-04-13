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

        public SalesController(SDJR1Context context)
        {
            _context = context;
        }

        // GET: Sales
        public async Task<IActionResult> Index()
        {
            var sDJR1Context = _context.TransactionHead.Include(t => t.Customer).Include(t => t.Staff).Include(t => t.Store);
            return View(await sDJR1Context.ToListAsync());
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
            ViewData["StaffId"] = new SelectList(_context.Staff, "Id", "Location");
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Name");
            return View();
        }

        // POST: Sales/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,CustomerId,StaffId,StoreId,Date")] TransactionHead transactionHead)
        {
            if (ModelState.IsValid)
            {
                _context.Add(transactionHead);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CustomerId"] = new SelectList(_context.Customer, "Id", "Address", transactionHead.CustomerId);
            ViewData["StaffId"] = new SelectList(_context.Staff, "Id", "Location", transactionHead.StaffId);
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Name", transactionHead.StoreId);
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
            ViewData["StaffId"] = new SelectList(_context.Staff, "Id", "Location", transactionHead.StaffId);
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Name", transactionHead.StoreId);
            return View(transactionHead);
        }

        // POST: Sales/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,CustomerId,StaffId,StoreId,Date")] TransactionHead transactionHead)
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
            ViewData["StaffId"] = new SelectList(_context.Staff, "Id", "Location", transactionHead.StaffId);
            ViewData["StoreId"] = new SelectList(_context.Store, "Id", "Name", transactionHead.StoreId);
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
