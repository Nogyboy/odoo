from odoo import api, models, fields
from datetime import timedelta

from odoo.exceptions import UserError

class PropertyOffer(models.Model):
    _name = "estate_property_offer"
    _description = "Real Estate Property Offers Model"

    price = fields.Float(required=True, string="Precio")
    status = fields.Selection([
        ('draft', 'Draft'),
        ('accepted', 'Accepted'),
        ('refused', 'Refused'),
    ], default='draft', required=True, string="Estado", copy=False,)
    partner_id = fields.Many2one('res.partner', string="Comprador", required=True)
    property_id = fields.Many2one('estate_property', string="Propiedad", required=True)
    validity = fields.Integer(string="Validez (días)", default=7)
    date_deadline = fields.Date(string="Fecha límite", compute="_compute_date_deadline", inverse="_inverse_date_deadline")

    _sql_constraints = [
        ('check_price', 'CHECK(price > 0)', 'El precio debe ser mayor que 0.'),
    ]
    
    @api.depends('validity')
    def _compute_date_deadline(self):
            for record in self:
                record.date_deadline = fields.Date.today() + timedelta(days=record.validity)
    
    def _inverse_date_deadline(self):
        for record in self:
            record.validity = (record.date_deadline - fields.Date.today()).days
    
    def action_confirm_offer(self):
        # Validate if any other offer has been accepted
        if self.property_id.offer_ids.filtered(lambda r: r.status == 'accepted'):
            raise UserError("Ya existe una oferta aceptada para esta propiedad.")
        # Set offer price as selling price
        self.property_id.selling_price = self.price
        # Set property state to offer_accepted
        self.status = 'accepted'
        return True
    
    def action_refuse_offer(self):
        # Validate if this offer was canceled
        if self.status == 'refused' or self.status == 'accepted':
            raise UserError("Esta oferta ya ha sido rechazada o aceptada.")
        # Refuse offer
        self.status = 'refused'
        return True