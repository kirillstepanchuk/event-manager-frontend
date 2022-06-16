export const imageToBase64 = (file: File): Promise<string> => { //eslint-disable-line
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64: string = reader.result as string;
      resolve(base64);
    };

    reader.readAsDataURL(file);

    reader.onerror = reject;
  });
};
