from frappe.website.doctype.web_page.web_page import WebPage


class BlockEditorWebPage(WebPage):
	def get_context(self, context):
		super().get_context(context)

		if self.content_type != "Block Editor":
			return

		context.block_editor_content = self.block_editor_html_rendered or ""

		context.template = "block_editor_frappe/templates/pages/web_page_block_editor.html"
