interface RelatedSearchesProps {
  searchQuery: string;
}

export function RelatedSearches({ searchQuery }: RelatedSearchesProps) {
  const relatedSearches = [
    `${searchQuery} with embedded machine learning`,
    `${searchQuery}: yolo custom object detection with colab gpu`,
    `${searchQuery} python`,
    `${searchQuery} basics`,
    `${searchQuery} specialization`,
    `${searchQuery} engineer`,
  ];

  return (
    <div className="border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Searches related to {searchQuery}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {relatedSearches.map((search) => (
            <button
              key={search}
              className="text-left text-blue-600 hover:underline text-sm"
            >
              {search}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
