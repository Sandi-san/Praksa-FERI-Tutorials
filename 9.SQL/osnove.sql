/* CREATE */
CREATE DATABASE record_company;
CREATE TABLE bands (
	id SERIAL NOT NULL,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY(id)
);
CREATE TABLE albums (
	id SERIAL NOT NULL,
	name VARCHAR(255) NOT NULL,
	release_year INT,
	band_id INT NOT NULL,
	PRIMARY KEY(id),
	FOREIGN KEY (band_id) REFERENCES bands(id)
);

/* INSERT */
INSERT INTO bands(name)
VALUES ('Iron Maiden');
INSERT INTO bands(name) VALUES
('Deuce'), ('Avenged Sevenfold'), ('Ankor');
/* spreminjanje column imen z presledkom
v SELECT ne deluje v postgres ('') */
SELECT name FROM bands LIMIT 2;
SELECT id AS ID, name AS Band_Name
FROM bands;

SELECT * FROM bands ORDER BY name;

INSERT INTO albums 
(name, release_year, band_id) VALUES
('Numbers',1985,1),
('Power Slave',1984,1),
('Nightmare',2018,2),
('Nightmare',2010,3),
('Test Album',NULL,3);

/* SELECT */
SELECT * FROM albums;
SELECT DISTINCT name FROM albums;

UPDATE albums SET release_year=1982
WHERE id=1

SELECT * FROM albums WHERE release_year<2000
SELECT * FROM albums WHERE
name LIKE '%er%' OR band_id=2; 
SELECT * FROM albums WHERE release_year=1984
AND band_id=1;

SELECT * FROM albums WHERE release_year
BETWEEN 2000 AND 2018;
SELECT * FROM albums WHERE release_year
IS NULL;

DELETE FROM albums WHERE id=5;

/* JOIN */
/* INNER: kombinira tabele */
SELECT * FROM bands JOIN albums
ON bands.id = albums.band_id;
/* LEFT: prikaze vse na levi (bands) */
SELECT * FROM bands LEFT JOIN albums
ON bands.id = albums.band_id;
/* RIGHT: prikaze vse na desni (album) */
SELECT * FROM bands LEFT JOIN albums
ON bands.id = albums.band_id;

/* AGREGATNE FUNKCIJE */
SELECT AVG(release_year) FROM albums;
SELECT band_id, COUNT(band_id) FROM
albums GROUP BY band_id;

/* HAVING: WHERE v GROUP BY */
SELECT b.name AS band_name, 
COUNT(a.id) AS num_albums FROM bands AS b
LEFT JOIN albums AS a ON b.id=a.band_id
GROUP BY b.id, b.name /* dodaj tudi b.name */
HAVING COUNT(a.id)=1;
/* postgres noce imeti AS imen v HAVING */