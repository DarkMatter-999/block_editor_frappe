frappe.ui.form.on('Web Page', {
	refresh: function (frm) {
		let editor_wrapper = frm.fields_dict.main_section_html.wrapper;

		let editor = document.querySelectorAll("#block-editor-container");
		if (0 === editor?.length) {
			let editor = document.createElement("div");
			editor.id = "block-editor-container";

			editor_wrapper.append(editor);
		}

		let js_path = 'assets/block_editor_frappe/js/block_editor_main.bundle.js';

		frappe.require(js_path, () => {
			try {
				if (window.mountDMBlockEditor && editor?.length) {
					window.mountDMBlockEditor(editor[0]);
				}
			} catch (e) {
				if (frappe.boot.developer_mode) {
					console.error(e);
				}
			}
		})
	},
	content_type: function(frm) {
		frm.trigger('refresh');
	}
})
