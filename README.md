# Japan road-trip map

An interactive, filterable map of our recommended places in Japan, made for friends planning a similar road trip.

- **Areas:** narrow the map to one area (e.g. Tokyo, Kamakura). The map zooms to it and shows any notes and suggested days for that area.
- **Categories and types:** filter by category (Food, Snacks, Souvenirs, Accommodation…), then by type (Ramen, Sushi…). You can also search and sort.
- **Pop-ups:** tap a pin to see a photo, name, short description, our tips, any photos or videos, and a **View in Google Maps** button.
- **Driving routes:** compare the **fastest**, **toll-free** and **local-roads** routes between any two places. Each one shows its time, distance and tolls. There is also a list of **scenic drives** we've picked.
- **Works on phones:** on a phone the list becomes a pull-up sheet. It is easiest to use on a tablet or computer.

Everything you edit is in **`config.js`** (settings) and the **data lists** (a Google Sheet or the CSV files in `data/`).

---

## One-time setup (about 30–45 minutes)

### Step 1: Get a Google Maps API key

Your trip app already uses a Google Cloud project with billing switched on, so the simplest route is to **add a second key in that same project**. A separate key keeps this site independent: you can restrict it, or turn it off, without touching your own app.

**A. Open the right project**
1. Go to <https://console.cloud.google.com/> and sign in with the Google account you used for the trip app.
2. Click the **project picker** at the top left (next to the Google Cloud logo) and choose the trip app's project (probably **nippon-2026**).
   *Not sure which project?* In each project, open **☰ → APIs & Services → Credentials** and look for the key your trip app uses (it starts `AIzaSyAvuA…`). That is the project you want.

**B. Check billing and add a budget alert**
3. Open **☰ → Billing**. The project should already be linked to a billing account; your app's map wouldn't work otherwise. If it says "This project has no billing account", click **Link a billing account**.
4. Go to **Budgets & alerts → Create budget**. Name it (e.g. "Maps"), set *Projects* to this project, choose an amount (e.g. US$10) and keep the 50 / 90 / 100 % email alerts. Click **Finish**.
   A budget only emails you; it does not stop charges. Each Maps service has a free monthly allowance, and a friends' planning map should normally stay well within it.

**C. Switch on the three services**
5. Open **☰ → APIs & Services → Library**. Search for each of these, open it and click **Enable** (if it says **Manage**, it's already on):
   - **Maps JavaScript API** — the map. Probably already on.
   - **Places API (New)** — photos and the lookup helper. Pick the one that says **(New)**, not plain "Places API".
   - **Routes API** — the driving routes. Not "Directions API", which Google no longer offers to new users.

**D. Create the key**
6. Open **☰ → APIs & Services → Credentials → + Create credentials → API key**. Copy the key that appears. If a "Protect your key" or settings page opens, carry on below; otherwise click the new key's name in the list.
7. **Name:** e.g. "Road-trip map (friends)".
8. **Application restrictions:** choose **Websites**, then **Add** each of these:
   - `https://chainmailchan.github.io/*` (your GitHub Pages address)
     Use the whole address, not just this site's folder: browsers tell Google only *which site* a request comes from,
     so a folder-level entry blocks place lookups, Google photos and routes (the map itself would still load).
   - optionally `http://localhost:8000/*` (only if you want to preview on your own computer)
9. **API restrictions:** choose **Restrict key**, tick **Maps JavaScript API**, **Places API (New)** and **Routes API**, then **OK**.
10. Click **Save**. Changes can take up to about 5 minutes to work.

**E. Put the key in the site**
11. Open `config.js` and paste the key between the quotes: `googleMapsApiKey: 'AIza…'`.

> The key is visible in the page's source code. That is normal for Google Maps websites (your trip app works the same way). The "Websites" restriction is what stops anyone using it on another site.

*Alternative:* reuse your trip app's existing key. Add the new site address to its Websites list, enable the two extra APIs and tick them in its API restrictions. This works, but the two sites then share one key.

### Step 2: Put the site online

This repository has its own address, so your trip app at `chainmailchan.github.io/nippon-2026/` is not affected.

1. On GitHub, open this repository → **Settings → Pages**.
2. Under *Source* choose **Deploy from a branch**, then *Branch* **`main`** and **`/ (root)`**, and click **Save**.
3. After a minute or two the site is live at **https://chainmailchan.github.io/japan-roadtrip-cass26/**.

> The repository is **public**, so anyone with the link can see the site, including your tips. That suits a recommendations list, but don't put anything private in it (booking references, home addresses, etc.).

### Step 3: Curate your places in the Google Sheet

Your draft spreadsheet has four tabs: **Read me**, **Places**, **Areas** and **Routes**. Until it's connected, the site shows the switched-on places from the draft, which are stored in `data/`.

1. **Import it:** open drive.google.com → **New → File upload** → choose the draft `.xlsx` → open it → **File → Save as Google Sheets**.
2. **Curate:** set `show` to yes or no, fix any category, and add descriptions and tips. The grey `from` and `check` columns are notes for you; the site ignores them.
3. **Fill in missing locations:** open `…/japan-roadtrip-cass26/tools/lookup.html`. In the Places tab, select all (Ctrl/⌘+A) and copy, then paste into the helper and click **Look up**. Check the matches, click **Copy rows for Google Sheets**, then click cell **A1** of the Places tab and paste.
4. **Publish:** **File → Share → Publish to web.** Under *Link*, choose the **Places** tab and **Comma-separated values (.csv)**, then **Publish**, and copy the link. Do the same for **Areas** and **Routes**.
5. **Connect:** paste the three links into `config.js`:
   ```js
   data: {
     places: 'https://docs.google.com/spreadsheets/d/e/…/pub?gid=0&single=true&output=csv',
     routes: 'https://docs.google.com/…&output=csv',
     areas:  'https://docs.google.com/…&output=csv',
   },
   ```

From then on, edit the Sheet and the site picks up changes **within about 5 minutes**. Google refreshes published sheets on its own schedule.

> **Check your data:** open the site with `?check` on the end (e.g. `…/japan-roadtrip-cass26/?check`). A list at the bottom of the panel shows any rows that are hidden because something is missing.

---

## The lists

Column names are not case-sensitive. Only **name**, **area**, **category** and a location are required. Everything else is optional.

### Places

| Column | What to put | Example |
|---|---|---|
| `show` | `no` hides the row without deleting it. Blank or `yes` shows it. | yes |
| `name` | Place name. Starting it with `#` also hides the row. | Ichiran Shibuya |
| `ja_name` | Optional Japanese name, shown under the name (handy to show staff or a taxi driver) | らーめん林 |
| `area` | The area it belongs to. Becomes an area button. | Tokyo |
| `category` | One of the categories in `config.js` (Food, Snacks, Souvenirs, Accommodation, Sights, Theme Parks). A new one also works and gets a grey pin. | Food |
| `type` | Sub-type. Used for the second row of filters and the pin icon. | Ramen |
| `coordinates` | In Google Maps, **right-click the spot → click the numbers** to copy them, then paste. | 35.6595, 139.7005 |
| `place_id` | Google's ID for the place. Gives an exact "View in Google Maps" link and Google's photo if you don't add your own. The lookup helper fills it in. | ChIJ… |
| `top_pick` | `yes` to add a ★ and list it first | yes |
| `description` | One or two neutral sentences: what it is | Tonkotsu ramen chain with solo booths. |
| `notes` | **Your personal tips.** Shown in a highlighted "Our tips" box. Links become clickable. | Go before 11am; order extra-firm noodles. |
| `photo` | Main photo: `media/file.jpg`, an image link, a Google Drive link, or a YouTube link | media/ichiran.jpg |
| `media` | Extra photos and videos, **one per line** (or separated with `\|`) | media/a.jpg ⏎ https://youtu.be/… |
| `maps_url` | Optional: your own Google Maps link (overrides the automatic one). If you leave `coordinates` empty, a full desktop Google Maps link containing the pin's coordinates also works. | |

Separate `lat` and `lng` columns also work instead of `coordinates`.

### Routes (scenic drives)

| Column | What to put |
|---|---|
| `name` | e.g. "Hakone loop" |
| `area` | Shown when that area is selected. Leave blank to always show it. |
| `from`, `to` | A place name from your Places list, coordinates, or an address |
| `via` | Points to pass through, one per line. These make the route follow the roads you mean. |
| `avoid_tolls`, `avoid_highways` | `yes` if the drive should avoid them |
| `description`, `notes`, `media`, `maps_url` | Same as for Places |

### Areas (optional)

| Column | What to put |
|---|---|
| `area` | Exactly as written in Places |
| `days` | e.g. "2–3 days" |
| `summary` | A short note shown when someone picks that area |

Areas appear in the order of this tab. Any area not listed here goes after them, in alphabetical order.

---

## Adding places quickly: the lookup helper

Open **`…/japan-roadtrip-cass26/tools/lookup.html`**. This page is for you, not your friends.

1. Type place names, one per line (e.g. "Ichiran Shibuya"). Or paste a **Google Takeout export of a Google Maps list** (see below).
2. Optionally fill in the area and category for the batch, then click **Look up**.
3. Check each match (change it in the drop-down if Google picked the wrong branch), then click **Copy rows for Google Sheets**.
4. Click cell **A** of the first empty row in your Places tab and paste. Fill in the rest (type, description, notes) afterwards.

### Already have places saved in Google Maps lists?

Google Maps lists can't be read directly by a website, but you can export them:

1. Go to <https://takeout.google.com/>, click **Deselect all**, then tick only **Saved**, and export.
2. Each list becomes a CSV file with **Title, Note, URL** columns. It doesn't include coordinates or categories.
3. Paste a list's contents into the lookup helper. It finds each place and brings across your Google Maps note as `notes`.

**Tip:** it's still worth *sharing your Google Maps lists* with your friends. Once saved on their phones, the pins appear in the Google Maps app while they're driving. This site is for planning; the shared list is handy on the road.

---

## Photos and videos (optional)

| What | Best way |
|---|---|
| **Photos** | Upload to the `media/` folder on GitHub (**Add file → Upload files**), then use `media/your-photo.jpg`. Use JPG, roughly 1600 px wide. iPhone HEIC files won't display. |
| **Videos** | Upload to **YouTube as Unlisted** and paste the link. It plays inside the pop-up. Short `.mp4` clips (under ~20 MB) can go in `media/`. |
| Google Drive | Set the file to *Anyone with the link* and paste the link. It works, but less reliably than the two options above. |
| Google Photos albums | Paste the album link. It appears as a "Photo album" button because Google Photos can't be shown inside other sites. |

If a place has no photo of your own but has a `place_id`, the pop-up shows Google's photo with its credit.

---

## Good to know

- **"Scenic" routes:** Google has no "scenic" setting. The **Local roads** option avoids expressways, which is usually the more scenic choice. For specific roads you love, add them to the **Routes** list with `via` points.
- **Route times** are typical driving times without live traffic. **Toll amounts** come from Google when available. Otherwise the route just says "Has tolls" or "No tolls".
- **"Open in Google Maps"** opens directions in the Google Maps app or website. Google's links can't switch on "avoid tolls" automatically, so for those options the button reminds you to turn it on under *Options*.
- **Share a single place:** the 🔗 button on a pop-up copies a link that opens straight to that place.
- **Preview on your computer:** in this folder run `python3 -m http.server 8000` and open <http://localhost:8000>. Opening `index.html` by double-clicking won't load the lists. Remember to allow `http://localhost:8000/*` on your API key.

### Files

```
index.html          the page
config.js           ← your settings (API key, data links, categories, colours, icons)
assets/app.js       how it works (no need to edit)
assets/styles.css   how it looks
data/*.csv          example lists (or use a Google Sheet)
media/              your photos and short videos
tools/lookup.html   lookup helper for adding places
```
