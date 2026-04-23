const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export async function submitWeb3Forms(formData: FormData): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    body: formData
  });
  return response.json();
}
