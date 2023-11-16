import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

interface MovieCardProps {
  id: string;
  image: string;
  title: string;
  year: string;
  isEditable: string;
}

const MovieCard: FunctionComponent<MovieCardProps> = ({
  id,
  image,
  title,
  year,
  isEditable,
}: MovieCardProps) => {
  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <Link to={`/detail/${id}`}>
        <div className="flex-1 flex flex-col">
          <img className="h-48 mx-auto mt-4" src={image} alt={title} />
          <div className="p-4">
            <h3 className="mt-6 text-gray-900 text-sm font-medium">{title}</h3>
            <dl className="mt-1 flex-grow flex flex-col justify-between">
              <dd className="text-gray-500 text-sm">{year}</dd>
            </dl>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default MovieCard;
