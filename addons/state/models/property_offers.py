from odoo import api, models, fields
from datetime import timedelta

class PropertyOffer(models.Model):
    _name = "estate_property_offer"
    _description = "Real Estate Property Offers Model"

    price = fields.Float(required=True, string="Precio")
    status = fields.Selection([
        ('accepted', 'Accepted'),
        ('refused', 'Refused'),
    ], default='accepted', required=True, string="Estado", copy=False)
    partner_id = fields.Many2one('res.partner', string="Comprador", required=True)
    property_id = fields.Many2one('estate_property', string="Propiedad", required=True)
    validity = fields.Integer(string="Validez (días)", default=7)
    date_deadline = fields.Date(string="Fecha límite", compute="_compute_date_deadline", inverse="_inverse_date_deadline")

    @api.depends('validity')
    def _compute_date_deadline(self):
        self.date_deadline = fields.Date.today() + timedelta(days=self.validity)
    
    def _inverse_date_deadline(self):
        for record in self:
            record.validity = (record.date_deadline - fields.Date.today()).days