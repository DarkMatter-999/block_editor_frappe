import os
import subprocess

import frappe


def build_assets():
	app_path = frappe.get_app_path("block_editor_frappe")
	frontend_path = os.path.join(app_path, "..", "block_editor_frontend")

	if not os.path.exists(frontend_path):
		frappe.logger().warning("Frontend folder not found, skipping build")
		return

	try:
		subprocess.check_call(["npm", "install"], cwd=frontend_path)

		if frappe.conf.developer_mode:
			subprocess.check_call(["npm", "run", "build:development"], cwd=frontend_path)

		else:
			subprocess.check_call(["npm", "run", "build"], cwd=frontend_path)
			subprocess.check_call(["npm", "run", "build:frontend"], cwd=frontend_path)

	except subprocess.CalledProcessError as e:
		frappe.throw(f"Frontend build failed: {e}")
