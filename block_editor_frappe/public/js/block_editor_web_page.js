let editor_node = null;

frappe.ui.form.on('Web Page', {
	onload: function (frm) {
		let js_path = 'assets/block_editor_frappe/js/block_editor_main.bundle.js';

		frappe.require(js_path, () => {
            if (!editor_node && window.mountDMBlockEditor) {
                editor_node = document.createElement("div");
                editor_node.id = "block-editor-container";

                window.mountDMBlockEditor(editor_node);
            }
        });
	},
	refresh: function (frm) {
		if ('HTML' !== frm.doc.content_type || !editor_node) return;

        const wrapper = frm.fields_dict.main_section_html.wrapper;

        if (!wrapper.contains(editor_node)) {
            wrapper.appendChild(editor_node);
        }
	},
	content_type: function(frm) {
		frm.trigger('refresh');
	}
})
