let editor_node = null;
let editor_manager = null;

frappe.ui.form.on("Web Page", {
	onload: function (frm) {
		let js_path = "/assets/block_editor_frappe/js/block_editor_main.bundle.js";
		let css_path = "/assets/block_editor_frappe/css/block_editor_main.bundle.css";

		frappe.require(js_path, () => {
			if (!editor_node && window.mountDMBlockEditor) {
				if (!document.querySelector(`link[href="${css_path}"]`)) {
					const link = document.createElement("link");
					link.rel = "stylesheet";
					link.type = "text/css";
					link.href = css_path;

					document.head.appendChild(link);
				}

				if (!editor_node) {
					editor_node = document.createElement("div");
					editor_node.id = "block-editor-container";
					editor_node.style.cssText =
						"display: none; position: fixed; inset: 0; z-index: 1500; background: white;";
					document.body.appendChild(editor_node);
				}

				frm.trigger("setup_editor");
			}
		});
	},
	refresh: function (frm) {
		if (window.mountDMBlockEditor) {
			frm.trigger("setup_editor");
		}

		const wrapper = frm.fields_dict.block_editor_interface.wrapper;
		const is_block_editor = frm.doc.content_type === "Block Editor";

		frm.toggle_display(["block_editor_html_internal"], !is_block_editor);

		let launch_container = document.getElementById("block-editor-launch-box");

		if (is_block_editor) {
			if (!launch_container) {
				launch_container = document.createElement("div");
				launch_container.id = "block-editor-launch-box";
				launch_container.style.cssText = `
					padding: 40px;
					text-align: center;
					border: 1px dashed var(--border-color);
					background: var(--bg-light-gray);
					border-radius: var(--border-radius-lg);
					margin: var(--margin-md) 0;
					`;

				launch_container.innerHTML = `
					<div class="text-muted" style="margin-bottom: var(--margin-sm); font-size: var(--text-md);">
									This content is managed by the Block Editor
					</div>
					<button id="btn-open-block-editor" class="btn btn-primary btn-sm">
									Edit Page Content
					</button>
					`;

				wrapper.insertAdjacentElement("afterend", launch_container);

				launch_container.querySelector("#btn-open-block-editor").onclick = () => {
					if (editor_node) {
						editor_node.style.display = "block";
					}
				};
			}
			launch_container.style.display = "block";
		} else if (launch_container) {
			launch_container.style.display = "none";
		}
	},
	content_type: function (frm) {
		frm.trigger("refresh");
	},
	setup_editor: function (frm) {
		if (!editor_manager) {
			editor_manager = window.mountDMBlockEditor(
				editor_node,
				frm.doc.block_editor_html_internal || "",
				(raw_content, rendered_content) => {
					frm.set_value("block_editor_html_internal", raw_content);
					frm.set_value("block_editor_html_rendered", rendered_content);
				},
				() => {
					editor_node.style.display = "none";
				},
				frm.doc.name,
			);
		} else {
			editor_manager.update(frm.doc.block_editor_html_internal || "", frm.doc.name);
		}
	},
});
