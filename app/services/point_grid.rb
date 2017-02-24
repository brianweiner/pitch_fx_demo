#!/usr/bin/env ruby
#
# kmeans.rb - an implementation of the k-means clustering algorithm on simple
#             2D data points read in from a CSV file. Produces graphic output
#             showing the clusters found in the input data.
#
# This program is under the terms of the BSD license.
#

require 'csv'
require 'rubygems'
require 'gnuplot'

#
# Globals
#

INFINITY = 1.0/0

#
# Point class, for representing a coordinate in 2D space
#

class Point
  attr_accessor :x, :y

  # Constructor that takes in an x,y coordinate
  def initialize(x,y)
    @x = x
    @y = y
  end

  # Calculates the distance to Point p
  def dist_to(p)
    xs = (@x - p.x)**2
    ys = (@y - p.y)**2
    return Math::sqrt(xs + ys)
  end

  # Return a String representation of the object
  def to_s
    return "(#{@x}, #{@y})"
  end
end

#
# Cluster class, represents a centroid point along with its associated
# nearby points
#

class Cluster
  attr_accessor :center, :points

  # Constructor with a starting centerpoint
  def initialize(center)
    @center = center
    @points = []
  end

  # Recenters the centroid point and removes all of the associated points
  def recenter!
    xa = ya = 0
    old_center = @center

    # Sum up all x/y coords
    @points.each do |point|
      xa += point.x
      ya += point.y  
    end

    # Average out data
    xa /= points.length
    ya /= points.length

    # Reset center and return distance moved
    @center = Point.new(xa, ya)
    return old_center.dist_to(center)    
  end
end

#
# kmeans algorithm
#

def kmeans(data, k, delta=0.001)
  clusters = []

  # Assign intial values for all clusters
  (1..k).each do |point|
    index = (data.length * rand).to_i

    rand_point = data[index]
    c = Cluster.new(rand_point)

    clusters.push c
  end

  # Loop
  while true
    # Assign points to clusters
    data.each do |point|
      min_dist = +INFINITY
      min_cluster = nil

      # Find the closest cluster
      clusters.each do |cluster|
        dist = point.dist_to(cluster.center)

        if dist < min_dist
          min_dist = dist
          min_cluster = cluster
        end
      end

      # Add to closest cluster
      min_cluster.points.push point
    end

    # Check deltas
    max_delta = -INFINITY

    clusters.each do |cluster|
      dist_moved = cluster.recenter!

      # Get largest delta
      if dist_moved > max_delta
        max_delta = dist_moved
      end
    end

    # Check exit condition
    if max_delta < delta
      return clusters
    end

    # Reset points for the next iteration
    clusters.each do |cluster|
      cluster.points = []
    end
  end
end