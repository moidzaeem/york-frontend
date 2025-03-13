const Toast = ({ closeToast, children }) => {
  return (
    <div className="flex items-center">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">
            { children }
        </p>
      </div>
      <button onClick={closeToast} className="ml-4 text-sm text-blue-500">
        Close
      </button>
    </div>
  );
};

export default Toast;