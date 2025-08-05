// src/components/LoadingSpinner.tsx

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
    </div>
  );
}