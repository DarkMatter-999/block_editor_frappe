import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields


def execute():
	create_custom_fields(
		{
			"Web Page": [
				{
					"fieldname": "block_editor_html_internal",
					"fieldtype": "Code",
					"label": "Editor HTML",
					"options": "HTML",
					"hidden": 1,
					"insert_after": "content_type",
				},
				{
					"fieldname": "block_editor_html_rendered",
					"fieldtype": "Code",
					"label": "Rendered HTML",
					"options": "HTML",
					"read_only": 1,
					"insert_after": "block_editor_html_internal",
				},
				{
					"fieldname": "block_editor_css",
					"fieldtype": "Code",
					"label": "Block Editor CSS",
					"options": "CSS",
					"insert_after": "block_editor_html_rendered",
				},
				{
					"fieldname": "block_editor_interface",
					"fieldtype": "HTML",
					"label": "Editor Interface",
					"options": "HTML",
					"insert_after": "block_editor_css",
				},
			]
		}
	)

	current_options = frappe.get_meta("Web Page").get_field("content_type").options

	if "Block Editor" not in (current_options or ""):
		new_options = (current_options + "\nBlock Editor") if current_options else "Block Editor"
		frappe.make_property_setter(
			{
				"doctype": "Web Page",
				"fieldname": "content_type",
				"property": "options",
				"value": new_options,
				"property_type": "Select",
			}
		)
