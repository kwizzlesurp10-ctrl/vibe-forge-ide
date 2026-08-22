# Playwright Testing & Visual Automation Guide

This guide documents how the Agent Swarm can trigger browser navigation, accessibility snapshotting, and screenshot tools on **`http://localhost:3001`** using the Playwright MCP server tools.

## Available Playwright Tools (`C:\Users\Keith\mcps\playwright\tools`)

The Playwright MCP server provides 24 tools for end-to-end browser automation. Below are the key tools for visual automation and testing:

1. **`browser_navigate`**
   - **Description**: Navigate to a specified URL.
   - **Parameters**: 
     - `url` (string, required): The target URL (e.g., `http://localhost:3001`).

2. **`browser_snapshot`**
   - **Description**: Capture an accessibility/ARIA snapshot of the current page (preferred for element selection and action planning).
   - **Parameters**:
     - `target` (string, optional): Exact target element reference or unique selector.
     - `filename` (string, optional): Save snapshot to a markdown file.
     - `depth` (number, optional): Limit tree depth.
     - `boxes` (boolean, optional): Include bounding boxes `[box=x,y,width,height]`.

3. **`browser_take_screenshot`**
   - **Description**: Take a visual screenshot of the current page or an element.
   - **Parameters**:
     - `type` (`png` | `jpeg`, required): Image format (default `png`).
     - `scale` (`css` | `device`, required): Resolution scale (default `css`).
     - `fullPage` (boolean, optional): Full scrollable page screenshot.
     - `filename` (string, optional): Output filename.
     - `target` / `element` (string, optional): Target specific element.

4. **Additional Interactive Tools**:
   - `browser_click`, `browser_type`, `browser_fill_form`, `browser_hover`, `browser_press_key`, `browser_select_option`, `browser_drag`, `browser_drop`, `browser_file_upload`, `browser_handle_dialog`
   - `browser_wait_for`, `browser_network_requests`, `browser_console_messages`, `browser_resize`, `browser_tabs`, `browser_close`, `browser_run_code_unsafe`

---

## Agent Swarm Execution Flow for `http://localhost:3001`

When testing or validating the frontend app running at `http://localhost:3001`, agents should execute the following sequence:

### Step 1: Navigate to the Application
Call `call_mcp_tool` for the Playwright server:
```json
{
  "ServerName": "playwright",
  "ToolName": "browser_navigate",
  "Arguments": {
    "url": "http://localhost:3001"
  }
}
```

### Step 2: Capture Page State (Snapshot)
Get the accessibility tree to inspect interactive elements and structure:
```json
{
  "ServerName": "playwright",
  "ToolName": "browser_snapshot",
  "Arguments": {
    "boxes": true
  }
}
```

### Step 3: Take Visual Screenshot for Verification
Record the visual appearance of the app:
```json
{
  "ServerName": "playwright",
  "ToolName": "browser_take_screenshot",
  "Arguments": {
    "type": "png",
    "scale": "css",
    "fullPage": true,
    "filename": "vibe-forge-landing.png"
  }
}
```

### Step 4: Interact & Validate
Use `browser_click`, `browser_fill_form`, and subsequent snapshots/screenshots to verify user flows and UI states.

