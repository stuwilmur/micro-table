// Adapated from linear-interpolator by F. Klee, https://github.com/feklee/linear-interpolator (MIT License)

export function linearInterpolator(points, extrapolate = true) {
  const n = points.length - 1;

  if (points.length === 0) {
    return () => {
      return 0;
    };
  }

  if (points.length === 1) {
    return () => {
      return points[0][1];
    };
  }

  points = points.sort((a, b) => {
    return a[0] - b[0];
  });

  const first = points[0];

  function leftExtrapolated(x) {
    const a = points[0];
    const b = points[1];
    return a[1] + ((x - a[0]) * (b[1] - a[1])) / (b[0] - a[0]);
  }

  function interpolated(x, a, b) {
    return a[1] + ((x - a[0]) * (b[1] - a[1])) / (b[0] - a[0]);
  }

  function rightExtrapolated(x) {
    const a = points[n - 1];
    const b = points[n];
    return b[1] + ((x - b[0]) * (b[1] - a[1])) / (b[0] - a[0]);
  }

  return (x) => {
    if (x < first[0]) {
      return extrapolate ? leftExtrapolated(x) : null;
    }
    for (let i = 0; i < n; i += 1) {
      if (x >= points[i][0] && x <= points[i + 1][0]) {
        return interpolated(x, points[i], points[i + 1]);
      }
    }
    return extrapolate ? rightExtrapolated(x) : null;
  };
}
