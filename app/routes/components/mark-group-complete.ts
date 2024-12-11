import { redirect } from "@remix-run/node";

// Action to handle marking the group as complete
export async function markGroupComplete({ request }: ActionFunctionArgs) {
  try {
    const formData = new URLSearchParams(await request.text());
    const groupId = parseInt(formData.get('groupId')!, 10);

    if (!groupId) {
      return json({ error: "Missing group ID" }, { status: 400 });
    }

    // Mark the group as complete
    const updatedGroup = await db.group.update({
      where: { id: groupId },
      data: { complete: true },
    });

    redirect(url: '/groups');
  } catch (error) {
    console.error("Failed to mark group as complete:", error);
  }
}
