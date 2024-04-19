import { redirect } from "next/navigation";

export default async function AddEventPage() {
  async function submit(formData) {
    "use server";

    let headersList = {
      Accept: "application/json",
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      Prefer: "return=representation",
      "Content-Type": "application/json",
    };

    let bodyContent = JSON.stringify({
      name: formData.get("name"),
      when: formData.get("when"),
      description: formData.get("description"),
    });

    let response = await fetch(
      "https://nysithfbivjiezuglkoj.supabase.co/rest/v1/events",
      {
        method: "POST",
        body: bodyContent,
        headers: headersList,
      }
    );

    let data = await response.json();
    //console.log(data);
    const id = data[0].id;
    redirect("/events/" + id + "/page");
  }

  return (
    <form action="{submit}" class="max-w-lg mx-auto p-4 rounded-lg">
      <div class="mb-4">
        <label
          htmlFor="form_name"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Titel
        </label>
        <input
          id="form_name"
          type="text"
          name="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="mb-4">
        <label
          htmlFor="form_when"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Hvornår
        </label>
        <input
          id="form_when"
          type="date"
          name="when"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="mb-6">
        <label
          htmlFor="form_description"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Beskrivelse
        </label>
        <input
          id="form_description"
          type="text"
          name="description"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Gem
      </button>
    </form>
  );
}
