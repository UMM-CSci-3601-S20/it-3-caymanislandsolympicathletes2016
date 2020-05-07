# Doorboard Web Application

The power of **Doorboard** is the ability to share messages that were traditionally on a post-it note in an online format for greater access.

**Doorboard** is a lightweight web application that was designed to allow members within an organization to quickly communicate updates about their availability during scheduled hours. It is meant to replace the iconic “post-it” note and improve upon it to provide a more meaningful medium of communication. Members within an organization no longer need to worry that their message is not communicated to those that are not local to their facility (e.g. remote learners, employees, affiliates, etc.). If things should change, members can quickly access the platform to manage their notes to keep information current. **Doorboard** can be accessed via a normal computer browser or with mobile devices.

**Doorboard** uses the nomenclature **Note**, **Owner** and **Viewer** to differentiate between member posts (posted messages), member users (**Doorboard** owners) and the end users for that specific organization.

**Doorboard** is split into two main views, each with their own functionality:
- **Owner Page** - member view for managing notes
  ![owner page](doorboard_pamphlet_images/Doorboard%20Owner%20Page.png)
- **Viewer Page** - end user view for accessing member notes (read-only access) and their google calendar
  ![viewer page](doorboard_pamphlet_images/Doorboard%20Viewer%20Page.png)
  ![viewer page gcal button](doorboard_pamphlet_images/Doorboard%20g-cal%20button.png)
  ![viewer page gcal](doorboard_pamphlet_images/Doorboard%20-%20Gcal%20view.png)

Within each view, **Notes** are displayed with the following information:
- **Timestamps** - time of creation or last modification
- **Body** - text of the note
- **Pin Star & Background Color** - indicates important messages that have been highlighted by the **Doorboard** member
![note pinning & background](doorboard_pamphlet_images/Doorboard%20Live%20&%20Pinned%20Notes.png)

The **Owner Page** provides the interface for faculty to manage their "live" and "trashed" Notes. The main features are as follows:
- **Authentication** - authentication is managed through google's Auth0 platform
<img src="/doorboard_pamphlet_images/Doorboard%20Auth0%20Login.png" alt="Authentication" width = "450" height = "300"/>

- **Creating Notes** - posts live notes
![new note button](doorboard_pamphlet_images/Doorboard%20Add%20Note%20Button.png)
![new note view](doorboard_pamphlet_images/Doorboard%20New%20Note%20View.png)
![new live note](doorboard_pamphlet_images/Doorboard%20Live%20Note.png)
- **Editing Notes** - edits live notes
![edit note button](doorboard_pamphlet_images/Doorboard%20Edit%20Note%20Button.png)
![editing notes](doorboard_pamphlet_images/Doorboard%20Edit%20Note%20View.png)
- **Pinning Notes** - highlights important notes and puts them at the top of an owner's **Doorboard**
![pinning notes](doorboard_pamphlet_images/Doorboard%20%20Pin%20Note%20Button.png)
![live & pinned notes](doorboard_pamphlet_images/Doorboard%20Live%20&%20Pinned%20Notes.png)
- **Trashing Notes** - puts notes inside of the **Owner's** trash
![trash note button](doorboard_pamphlet_images/Doorboard%20Move%20Note%20to%20Trash%20Button.png)
- **Deleting & Restoring Note** - permanently removes notes from the **Owner's** trash or restores them to the **Doorboard** by first navigating to the trash and selecting delete/restore
![go to trash button](doorboard_pamphlet_images/Doorboard%20Trash%20Can%20Button.png)
![trash can view](doorboard_pamphlet_images/Doorboard%20Trash%20Can%20View.png)
![delete note button](doorboard_pamphlet_images/Doorboard%20Delete%20from%20Trash%20Button.png)
![restore note button](doorboard_pamphlet_images/Doorboard%20Restore%20Note%20Button.png)

In addition, the **Owner Page** allows members to generate a PDF that displays a unique URL and QR code that links to their **Doorboard**. This URL provides the **Viewer Page** view to anyone wanting to visit that member's **Doorboard**.

![owner hub](doorboard_pamphlet_images/Doorboard%20Owner%20Hub.png)

![owner page -> QR & PDF](doorboard_pamphlet_images/Doorboard%20QR%20Code:PDF.png)

**Doorboard** is available on mobile platforms.

![mobile owner page](doorboard_pamphlet_images/Doorboard%20Mobile%20Owner%20View.png)

![mobile viewer page](doorboard_pamphlet_images/Doorboard%20Mobile%20Viewer%20View.png)