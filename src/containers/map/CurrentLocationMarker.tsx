import { Marker } from '@react-google-maps/api';
import React, { FC } from 'react';

import { Position } from '../../types/events';

interface CurrentLocationMarkerProps {
  position: Position
}

const CurrentLocationMarker: FC<CurrentLocationMarkerProps> = ({ position }) => (
  <Marker
    position={position}
    icon={{
      url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAADQ0lEQVRoge3Z34uUVRgH8M9qzRbVakgLaj8kkCi9CbO6sSKJIOo/KOgyKry2P6BCUrsLogtvrJsy6iqCMKMotbaCMIyFoNQNo1Ztt4JqZ70456WZ2dmZ97zvmZ0p9guHeRme5znf73ve8zznB4PBOPbgOOZjO45n0RhQn9mxGV9jcZn2VbQZaYzrLaJoXxrxkdmjv4iiPTMkjqVwQnkhnw2JYynMKS9kLmfHa3IGS0QzZ7DcQk4NyLYvcgt5PcH2cOa+s2JcqBP95seUEU+/hGLXS8wUNg2NXSIawnLkUyE7zcXnp/0HRmKoGMscbwsexm5sxYbYxjAb2/f4EO/jdOb+a2OLkIUWlC+ITbyD24fAtyvuwS/KC+hsv+GhFWfdgUn8rLqIol3EzSvMvQ0vdyFVtb2ywtzbML0MqSptug6RulnrH6ytGaPAAq6o6lxXyGJN/05U5pN70fjGgGz7IveIjHX5r1ff3fwrYZgbq6xYFTJqWBUyalgVEnEhC4uA2TrOdYW8XdO/FUcyxkrGdXhNeJtFcSu7SCxsZ/Eqrq1DJPdWl7TKng2rk33U8L8RUnkjI7yE23AXfsRHFeM8gJvwBb5T8ZQ+ZcKtxS48gp3YIWQtwkniRHxOnezzuKYlzhRO4j18LOwcs+BGvIjzlqbQc3gXj7fYp6RfeCLGONfF5jxeiBwqo4Hn8WdL4NPYh8ewcRm/VCGt2BRj7xM+s8L2j8jlylQRV+FYDLIgnCLuLOlbR0gn7tZ+gnksciuN/dHxrHCSmIKcQgrcG7ks4qUUx1+j052JHTIYISKXReF4dgmWqyNFCqySnn/PZNOJYn4kpeeDgvoZIeWm4Ij+o/FWYsxd+Cn6HkhxvBpHo2MTb+I+5erOpCBm3lIB84KIG0rEGcP90b4Z/Y9Gbklo4LkOQtPCaD3q32KYExMx9kHt58pz2KvHtV2ZN7wZT+FJ7YWpKdw+fYNv8YMw/DPCNUGxeyx+r2/5XS/UjI24BduwHbdqn7dncEjYr8z0IlllibIbDwp1JblA9cHf+Fz4hD7AJ0ouUepsbhrConEb7hAWfpPCqE1gXYy/PtpfFD6TS8It1VnhkuiMMKKnhGr+VxUylwFC33379ahe7wAAAABJRU5ErkJggg==',
    }}
  />
);

export default CurrentLocationMarker;
