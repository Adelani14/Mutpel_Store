
function ProductImageGallery() {
    return (
        <>
            {showGallery && (
                <div
                    className="modal fade show d-block"
                    style={{
                        background: "rgba(0,0,0,.9)",
                        zIndex: 99999,
                    }}
                    onClick={() => setShowGallery(false)}
                >
                    <div
                        className="modal-dialog modal-fullscreen"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-content bg-dark border-0">

                            <div className="modal-header border-0">
                                <button
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowGallery(false)}
                                />
                            </div>

                            <div className="modal-body d-flex flex-column justify-content-center align-items-center">

                                <div className="position-relative">

                                    <button
                                        className="btn btn-light position-absolute top-50 start-0 translate-middle-y"
                                        onClick={previousImage}
                                    >
                                        <i className="bi bi-chevron-left"></i>
                                    </button>

                                    <img
                                        src={product.imagespath[currentImage]}
                                        className="img-fluid"
                                        style={{
                                            maxHeight: "70vh",
                                            objectFit: "contain",
                                        }}
                                    />

                                    <button
                                        className="btn btn-light position-absolute top-50 end-0 translate-middle-y"
                                        onClick={nextImage}
                                    >
                                        <i className="bi bi-chevron-right"></i>
                                    </button>

                                </div>

                                <div className="text-white mt-3">
                                    {currentImage + 1} / {product.imagespath.length}
                                </div>

                                <div className="d-flex gap-2 mt-4 flex-wrap justify-content-center">
                                    {product.imagespath.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            onClick={() => setCurrentImage(index)}
                                            className={`rounded ${currentImage === index
                                                ? "border border-3 border-primary"
                                                : ""
                                                }`}
                                            style={{
                                                width: 70,
                                                height: 70,
                                                objectFit: "cover",
                                                cursor: "pointer",
                                            }}
                                        />
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductImageGallery;