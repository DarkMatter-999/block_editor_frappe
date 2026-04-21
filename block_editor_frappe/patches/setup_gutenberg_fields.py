import frappe


def execute():
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
