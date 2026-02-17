document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const statusDiv = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const submitButton = form.querySelector('button[type="submit"]');

      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      statusDiv.textContent = '';
      statusDiv.className = '';

      try {
        const response = await fetch('/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        // Check if the response is actually JSON before parsing
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
           throw new Error("Server connection failed. Please try again.");
        }

        const result = await response.json();

        if (response.ok) {
          statusDiv.textContent = result.message;
          statusDiv.classList.add('success');
          form.reset();
        } else {
          throw new Error(result.message || 'An unknown error occurred.');
        }
      } catch (error) {
        statusDiv.textContent = `Error: ${error.message}`;
        statusDiv.classList.add('error');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
      }
    });
  }
});