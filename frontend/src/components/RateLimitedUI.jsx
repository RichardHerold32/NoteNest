import { ShieldAlert, RotateCw } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-base-300/60 bg-base-100 shadow-xl">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-error/10 p-2 text-error">
              <ShieldAlert className="size-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Too many requests</h3>
              <p className="text-sm text-base-content/60">You’ve hit a temporary rate limit.</p>
            </div>
          </div>

          <div className="mt-6 space-y-3 text-sm text-base-content/70">
            <p>Give it a moment, then try again.</p>
            <p>If this keeps happening, close extra tabs or reduce rapid actions.</p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs text-base-content/50">This usually resets in under a minute.</span>
            <button
              type="button"
              className="btn btn-primary btn-sm gap-2"
              onClick={() => window.location.reload()}
            >
              <RotateCw className="size-4" />
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI
