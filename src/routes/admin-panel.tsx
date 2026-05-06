import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { isLoggedIn, logout } from "@/lib/admin-auth";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { LogOut, Save, RotateCcw, Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin-panel")({
  head: () => ({ meta: [{ title: "Admin Panel — Room For Tastebuds" }] }),
  component: AdminPanelPage,
});
type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
};
function AdminPanelPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
  if (!isLoggedIn()) {
    navigate({ to: "/admin" });
    return;
  }

  const fetchMenu = async () => {
    const querySnapshot = await getDocs(collection(db, "menu"));
    const data = querySnapshot.docs.map((docSnap) => {
  const d = docSnap.data() as Omit<MenuItem, "id">;

  return {
    id: docSnap.id,
    name: d.name || "",
    price: d.price || 0,
    description: d.description || "",
    image: d.image || "",
  };
});

    setItems(data);
  };

  fetchMenu();
}, [navigate]);

  const update = async (id: string, patch: Partial<MenuItem>) => {
  const ref = doc(db, "menu", id);
  await updateDoc(ref, patch);

  setItems((prev) =>
    prev.map((it) => (it.id === id ? { ...it, ...patch } : it))
  );
};

  const remove = async (id: string) => {
  await deleteDoc(doc(db, "menu", id));
  setItems((prev) => prev.filter((it) => it.id !== id));
};

  const add = async () => {
  const newItem = {
    name: "New Dessert",
    price: 0,
    description: "Describe this dessert...",
    image: "",
  };

  const docRef = await addDoc(collection(db, "menu"), newItem);

  setItems((prev) => [...prev, { id: docRef.id, ...newItem }]);
};

  const handleSave = () => {
  setSavedMsg("Saved to cloud ✅");
  setTimeout(() => setSavedMsg(""), 2000);
};

  const reset = () => {
  alert("Reset removed — now using live database");
};

  const onLogout = () => {
    logout();
    navigate({ to: "/admin" });
  };
  const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "byzx13iv");

  const res = await fetch("https://api.cloudinary.com/v1_1/dbiydzqzr/image/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.secure_url;
};
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 lg:py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-primary">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Edit menu items, prices, and descriptions.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={add} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-secondary">
            <Plus size={14} /> Add item
          </button>
          <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-secondary">
            <RotateCcw size={14} /> Reset
          </button>
          <button onClick={handleSave} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-primary-foreground hover:opacity-90">
            <Save size={14} /> Save
          </button>
          <button onClick={onLogout} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm hover:bg-secondary">
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {savedMsg && (
        <div className="mb-5 rounded-lg border border-gold/40 bg-gold/10 px-4 py-2 text-sm text-primary">{savedMsg}</div>
      )}

      <div className="space-y-5">
        {items.map((it) => (
          <div key={it.id} className="grid gap-5 rounded-2xl border border-border/60 bg-card p-5 shadow-card md:grid-cols-[140px_1fr_auto]">
            <div className="h-32 w-32 overflow-hidden rounded-lg border">
  <img
    src={it.image || "https://via.placeholder.com/300"}
    className="h-full w-full object-cover"
  />
</div>
            <div className="space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                  <input
                    value={it.name}
                    onChange={(e) => update(it.id, { name: e.target.value })}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Price</label>
                  <input
  value={it.price}
  onChange={(e) => update(it.id, { price: Number(e.target.value) })}
/>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-widest text-muted-foreground">Description</label>
                <textarea
                  value={it.description}
                  onChange={(e) => update(it.id, { description: e.target.value })}
                  rows={2}
                  className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
                />
              </div>
              <div className="space-y-3">
  <label className="text-xs uppercase tracking-widest text-muted-foreground">
    Upload Image
  </label>

  {/* Custom styled upload button */}
  <label className="inline-block cursor-pointer rounded-full border px-4 py-2 text-sm hover:bg-muted">
    Select Image
    <input
      type="file"
      accept="image/*"
      onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
          const url = await uploadImage(file);
          update(it.id, { image: url });
        } catch (err) {
          console.error(err);
        }
      }}
      className="hidden"
    />
  </label>

  {/* Show uploaded image URL */}
  <input
    value={it.image}
    onChange={(e) => update(it.id, { image: e.target.value })}
    placeholder="Image URL"
    className="w-full rounded-md border px-3 py-2 text-sm"
  />
</div>
            </div>
            <button
              onClick={() => remove(it.id)}
              aria-label="Remove item"
              className="self-start rounded-full border border-border bg-card p-2 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
